var jsforce = require('jsforce');
var conn = new jsforce.Connection();

function qualify(company_size, company_name){
  if (company_size < 100 ){
      this.URL_Redirect()
  } else {
     var companySearch = this.SFDC_SEARCH(company_name)
     
     if(companySearch.companyName != null){
            this.CalendlyRoundRobin();
     } else if(companySearch.companyName){
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

    document.getElementById('calendar').innerHTML = '<div class="calendly-inline-widget" data-url="https://calendly.com/sabeelsiddiqi/30min" style="min-width:320px;height:630px;"></div>';

}


