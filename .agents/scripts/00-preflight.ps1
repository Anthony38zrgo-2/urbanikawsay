param([switch]$Reseed)
. "$PSScriptRoot\_common.ps1"
$agentdb = Resolve-AgentDb
if (-not (Test-Path $DbPath)) {
    & $agentdb init | Out-Host
    & $agentdb seed | Out-Host
} elseif ($Reseed) {
    & $agentdb seed | Out-Host
}
& $agentdb validate | Out-Host
if ($LASTEXITCODE -ne 0) { throw "agentdb validate failed" }

$opencode = Get-Command opencode -ErrorAction SilentlyContinue
if (-not $opencode) { throw "opencode CLI is not available" }

Write-Host "Available configured models (filter manually if provider cache differs):"
& opencode models opencode-go 2>$null | Select-String -Pattern "glm-5.2|deepseek-v4-flash" | ForEach-Object { $_.Line }
Write-Host "Preflight OK"
