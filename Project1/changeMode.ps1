# Define variables for Front Door details
$resourceGroupName = "RG-MCAPSHELP-DEV-AFD"
# $frontDoorName = "RG-MCAPSHELP-DEV-AFD-Resource"
$policyName = "WAFmcapshelpdev"
# $newMode = "Detection" 

Connect-AzAccount

# Get the Front Door policy
$frontDoor = Get-AzFrontDoorWafPolicy -ResourceGroupName $resourceGroupName -Name $policyName
# $policy = $frontDoor.Policies | Where-Object { $_.Name -eq $policyName }

Write-Host $frontDoor.PolicyMode
# Write-Host $policy.Settings.Mode



# if ($policy -eq $null) {
#     Write-Host "Policy '$policyName' not found."
#     return
# }

# Change the mode of the policy
# $policy.Settings.Mode = $newMode

# Update the policy
# Set-AzFrontDoorPolicy -ResourceGroupName $resourceGroupName -FrontDoorName $frontDoorName -Policy $policy

# Write-Host "Policy mode updated successfully."