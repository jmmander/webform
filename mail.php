<?php 
$requestersEmail = $_POST['requestersEmail'];
$imEmail = $_POST['imEmail'];
$trainerEmail = $_POST['trainerEmail'];
$customerEmail = $_POST['customerEmail'];
$customerOrgName = $_POST['customerOrgName'];
$platform = $_POST['platform'];
$partnerEmail= $_POST['partnerEmail'];
$office= $_POST['office'];
$trainingLocation= $_POST['trainingLocation'];
$adminTraining= $_POST['adminTraining'];
$noStudios= $_POST['noStudios'];
$usersPerStudio= $_POST['usersPerStudio'];
$startDate= $_POST['startDate'];
$endDate= $_POST['endDate'];
$SSH= $_POST['SSH'];
$API= $_POST['API'];
$Hadoop= $_POST['Hadoop'];
$sendCopy= $_POST['sendCopy'];

if(isset($sendCopy)
{   $to = "$requestersEmail"
    $headers = "From: alex.kaos@dataiku.com" 
    $subject = "New platform request for $customerOrgName";
    $message = "Your email: $requestersEmail 
    \n IM email: $imEmail 
    \n trainer email: $trainerEmail 
    \n customer email: $customerEmail
    \n customer Org Name: $customerOrgName
    \n platform: $platform
    \n partner email: $partnerEmail
    \n office: $office
    \n training Location: $trainingLocation
    \n admin training: $adminTraining
    \n no studios: $noStudios
    \n users per studio: $usersPerStudio
    \n start date: $startDate
    \n end date: $endDate
    \n ssh: $SSH
    \n api: $API
    \n hadoop: $Hadoop"
    
    if (mail($to,$subject,$message,$headers)){
        echo 'Your mail has been sent successfully.';
    } else{
        echo 'Unable to send email. Please try again.';};
    
}
?>