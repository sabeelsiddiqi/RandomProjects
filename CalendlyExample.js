//IMPORTS JSFORCE, A LIBRARY TO CONNECT TO SFDC
var jsforce = require('jsforce');
var conn = new jsforce.Connection();

//MAIN FUNCTION TO TAKE FORM DATA AND QUALIFY LEAD
function qualify(company_size, company_name){
  if (company_size < 100 && role != role[0] && role != role[1] && role != role[2] && role != role[3]){
      
      //IF COMPANY SIZE IS LESS THAN 100 AND DOESN'T INCLUDE FIRST 4 ROLE TYPE
      this.URL_Redirect()
  } else {
    
    //CALLS FUNCTION TO DO SFDC SEARCH ON COMPANY NAME
     var companySearch = this.SFDC_SEARCH(company_name)
     
    if(companySearch.companyName != null){
            // IF THE COMPANY DOESN'T EXIST SHOW THE ROUND ROBIN TEAM CALENDAR
            this.CalendlyRoundRobin();
        } else if(companySearch.companyName && !companySearch.accountOwner){
            // IF THE COMPANY DOES EXIST BUT DOES NOT HAVE AN ACCOUNT OWNER THEN SHOW THE ROUND ROBIN TEAM CALENDAR
            this.CalendlyRoundRobin();
        } else if(companySearch.companyName && companySearch.accountOwner){
            // IF THE COMPANY DOES EXIST AND HAS AN ACCOUNT OWNER THEN SHOW THE AE'S CALENDAR
            this.AECalendar(companySearch.accountOwner);          
    }
  }
}

function URL_Redirect(){
  window.open("https://calendly.com/pages/solutions","_self")
}

function SFDC_SEARCH(company_name){
    conn.search("FIND {company_name} IN ALL FIELDS RETURNING Account(Id, Name), Lead(Id, Name)",
        function(err, res) {
            if (err) { return console.error(err); }
            return res;
        }
    );
}

function CalendlyRoundRobin(){
    //CALENDLY API
    //ROUND ROBIN BASED ON AVAILABILITY SETUP BY TEAM ADMIN ON CALENDLY
    //SHOWS TEAM CALENDAR ON WEBPAGE

    document.getElementById('calendar').innerHTML = '<div class="calendly-inline-widget" data-url="https://calendly.com/CalendlyTeam/30min" style="min-width:320px;height:630px;"></div>';

};

function AECalendar(accountOwner){
    //CALENDLY API
    //LOAD EMBEDED CALENDAR WITH ACCOUNTOWNER
    //var accountOwnerInfo = curl --header "X-TOKEN: <your_token>" https://calendly.com/api/v1/users/{accountOwner}


    document.getElementById('calendar').innerHTML = '<div class="calendly-inline-widget" data-url="'+accountOwnerInfo.url+'/30min" style="min-width:320px;height:630px;"></div>';

}


