$ErrorActionPreference = "Stop"

$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$AgentsRoot = [System.IO.Path]::GetFullPath((Join-Path $ScriptDir ".."))
$RepoRoot = try { (& git -C $AgentsRoot rev-parse --show-toplevel 2>$null).Trim() } catch { "" }
if ([string]::IsNullOrWhiteSpace($RepoRoot)) {
    $RepoRoot = [System.IO.Path]::GetFullPath((Join-Path $AgentsRoot ".."))
}
$AgentDb = Join-Path $AgentsRoot "runtime\target\release\agentdb.exe"
if (-not (Test-Path $AgentDb)) {
    $AgentDb = Join-Path $AgentsRoot "runtime\target\release\agentdb"
}
$DbPath = Join-Path $AgentsRoot "data\agents.db"
$env:AGENTS_ROOT = $AgentsRoot
$env:AGENT_DB = $DbPath

function Resolve-AgentDb {
    $exe = Join-Path $AgentsRoot "runtime\target\release\agentdb.exe"
    $unix = Join-Path $AgentsRoot "runtime\target\release\agentdb"
    if (Test-Path $exe) { return $exe }
    if (Test-Path $unix) { return $unix }
    Push-Location (Join-Path $AgentsRoot "runtime")
    try { & cargo build --release | Out-Host; if ($LASTEXITCODE -ne 0) { throw "cargo build failed" } }
    finally { Pop-Location }
    if (Test-Path $exe) { return $exe }
    if (Test-Path $unix) { return $unix }
    throw "agentdb release binary not found after build"
}

function ConvertTo-HexJson([string]$Text) {
    $bytes = [System.Text.Encoding]::UTF8.GetBytes($Text)
    return "hex:" + (($bytes | ForEach-Object { $_.ToString("x2") }) -join "")
}
