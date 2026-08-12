param()
. "$PSScriptRoot\_common.ps1"
$agentdb = Resolve-AgentDb
& $agentdb init | Out-Null
& $agentdb seed | Out-Null
& $agentdb validate | Out-Host
& $agentdb stats | Out-Host
& $agentdb agent planner | Out-Host
& $agentdb agent builder | Out-Host
& $agentdb knowledge vue component | Out-Host
& $agentdb knowledge svg currentColor | Out-Host

$plannerMeta = @{ agent_id='builder'; task_type='implementation'; attempt_count=0; technical_risk='low'; plan_ready=$false; acceptance_criteria_ready=$false } | ConvertTo-Json -Compress
$builderMeta = @{ agent_id='builder'; task_type='implementation'; attempt_count=0; technical_risk='low'; plan_ready=$true; acceptance_criteria_ready=$true } | ConvertTo-Json -Compress
& $agentdb route (ConvertTo-HexJson $plannerMeta) | Out-Host
& $agentdb route (ConvertTo-HexJson $builderMeta) | Out-Host
