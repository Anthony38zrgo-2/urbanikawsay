param(
    [Parameter(Mandatory=$true)][string]$Prompt,
    [string]$AgentId = "builder",
    [string]$TaskId = "",
    [string]$BacklogId = "",
    [string]$TaskType = "implementation",
    [int]$AttemptCount = 0,
    [switch]$HypothesisChanged,
    [switch]$NewEvidence,
    [switch]$FailureSignatureChanged,
    [switch]$SameFailureSignature,
    [switch]$DiagnosticMode,
    [int]$AffectedFiles = 0,
    [int]$AffectedSubsystems = 1,
    [switch]$ArchitectureChange,
    [switch]$CrossSubsystemChange,
    [string]$TechnicalRisk = "low",
    [switch]$RootCauseUnknown,
    [switch]$ConflictingArchitecturalConstraints,
    [switch]$OwnershipBoundaryRefactor,
    [switch]$LargeRegression,
    [switch]$PlanReady,
    [switch]$AcceptanceCriteriaReady,
    [string]$UserModelOverride = ""
)

. "$PSScriptRoot\_common.ps1"
$agentdb = Resolve-AgentDb
if (-not (Test-Path $DbPath)) { & $agentdb init | Out-Null; & $agentdb seed | Out-Null }
& $agentdb validate 2>$null | Out-Null
if ($LASTEXITCODE -ne 0) { throw "agentdb validate failed" }
if (-not (Get-Command opencode -ErrorAction SilentlyContinue)) { throw "opencode CLI is not available" }

$runArgs = @("run-start", $AgentId)
if ($TaskId) { $runArgs += $TaskId }
if ($BacklogId) { $runArgs += $BacklogId }
$runJson = (& $agentdb @runArgs | Out-String | ConvertFrom-Json)
if (-not $runJson.ok) { throw "run-start failed: $($runJson.error)" }
$runId = $runJson.run_id
$env:AGENT_RUN_ID = $runId

$meta = [ordered]@{
    agent_id = $AgentId
    task_type = $TaskType
    attempt_count = $AttemptCount
    hypothesis_changed = [bool]$HypothesisChanged
    new_evidence = [bool]$NewEvidence
    failure_signature_changed = [bool]$FailureSignatureChanged
    same_failure_signature = [bool]$SameFailureSignature
    diagnostic_mode = [bool]$DiagnosticMode
    affected_files = $AffectedFiles
    affected_subsystems = $AffectedSubsystems
    architecture_change = [bool]$ArchitectureChange
    cross_subsystem_change = [bool]$CrossSubsystemChange
    technical_risk = $TechnicalRisk
    root_cause_unknown = [bool]$RootCauseUnknown
    conflicting_architectural_constraints = [bool]$ConflictingArchitecturalConstraints
    ownership_boundary_refactor = [bool]$OwnershipBoundaryRefactor
    large_regression = [bool]$LargeRegression
    plan_ready = [bool]$PlanReady
    acceptance_criteria_ready = [bool]$AcceptanceCriteriaReady
    user_model_override = $(if ($UserModelOverride) { $UserModelOverride } else { $null })
}
$route = (& $agentdb route (ConvertTo-HexJson ($meta | ConvertTo-Json -Compress)) | Out-String | ConvertFrom-Json)
if (-not $route.ok) { throw "route failed: $($route.error)" }

$callMeta = [ordered]@{
    provider = $route.provider
    requested_model = $route.requested_model
    requested_effort = $route.requested_effort
    model_tier = $route.model_tier
    purpose = $TaskType
    routing_rule = $route.rule
    routing_reason = $route.reason
    routing_source = $(if ($UserModelOverride) { "user_override" } else { "auto" })
}
$call = (& $agentdb model-call start $runId (ConvertTo-HexJson ($callMeta | ConvertTo-Json -Compress)) | Out-String | ConvertFrom-Json)
$callId = $call.call_id

$success = $false
$inputTokens = $null
$cachedTokens = $null
$outputTokens = $null
$effectiveModel = $null
$effectiveVariant = $null
$errorText = $null
$sw = [System.Diagnostics.Stopwatch]::StartNew()
try {
    $args = @("run", "-m", $route.requested_model, "--variant", $route.requested_effort, "--agent", $route.profile, "--format", "json", "--dir", $RepoRoot)
    if ($TaskId) { $args += @("--title", $TaskId) }
    $args += $Prompt
    $raw = (& opencode @args 2>&1 | Out-String)
    if ($LASTEXITCODE -ne 0) { throw "opencode exited with code $LASTEXITCODE`n$raw" }

    $sessionId = $null
    foreach ($line in ($raw -split "`r?`n")) {
        if (-not $line.Trim().StartsWith("{")) { continue }
        try { $evt = $line | ConvertFrom-Json } catch { continue }
        if ($evt.type -eq "step_finish" -and $evt.part.tokens) {
            $inputTokens = $evt.part.tokens.input
            $cachedTokens = $evt.part.tokens.cache.read
            $outputTokens = $evt.part.tokens.output
        }
        if ($evt.type -eq "step_start" -and -not $sessionId) { $sessionId = $evt.sessionID }
    }
    if ($sessionId) {
        try {
            $exp = (& opencode export $sessionId 2>$null | ConvertFrom-Json)
            if ($exp.info.model.id) {
                $effectiveModel = "$($exp.info.model.providerID)/$($exp.info.model.id)"
                $effectiveVariant = $exp.info.model.variant
            }
        } catch {}
    }
    $success = $true
    Write-Output $raw
} catch {
    $errorText = $_.Exception.Message
} finally {
    $sw.Stop()
    $end = [ordered]@{
        success = $success
        duration_ms = [long]$sw.Elapsed.TotalMilliseconds
        effective_model = $effectiveModel
        effective_effort = $effectiveVariant
        verification_status = $(if ($effectiveModel) { "verified" } else { "unverified" })
        input_tokens = $inputTokens
        cached_input_tokens = $cachedTokens
        output_tokens = $outputTokens
    }
    & $agentdb model-call end $callId (ConvertTo-HexJson ($end | ConvertTo-Json -Compress)) 2>$null | Out-Null
    & $agentdb run-end $runId $(if ($success) { "success" } else { "failure" }) 2>$null | Out-Null
}
if (-not $success) { throw $errorText }
