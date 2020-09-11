document.addEventListener('DOMContentLoaded', function() {

  // Use buttons to toggle between views
  document.querySelector('#inbox').addEventListener('click', () => load_mailbox('inbox'));
  document.querySelector('#sent').addEventListener('click', () => load_mailbox('sent'));
  document.querySelector('#archived').addEventListener('click', () => load_mailbox('archive'));
  document.querySelector('#compose').addEventListener('click', compose_email);
 

  // By default, load the inbox
  load_mailbox('inbox');
});

function compose_email() {


  document.querySelector('#reply-email').innerHTML="New email";

  // Show compose view and hide other views
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'block';
  document.querySelector('#single-email').style.display='none';

  // Clear out composition fields
  document.querySelector('#compose-recipients').value = '';
  document.querySelector('#compose-subject').value = '';
  document.querySelector('#compose-body').value = '';


  document.querySelector('#submit').addEventListener('click',()=>{

    var recipentmessage = document.querySelector('#compose-recipients').value;
    var subjectmessage= document.querySelector('#compose-subject').value;
    var bodymessage = document.querySelector('#compose-body').value;


    if(subjectmessage.includes("Re:")){









    }else{

      fetch('/emails', {
        method: 'POST',
        body: JSON.stringify({
            recipients:recipentmessage,
            subject:subjectmessage,
            body:bodymessage
        })
      })
      .then(response => response.json())
      .then(result => {
          // Print result
          console.log(result);
      });




    }

    


   


 



 })
}

function load_mailbox(mailbox) {
  
  // Show the mailbox and hide other views
  document.querySelector('#emails-view').style.display = 'block';
  document.querySelector('#compose-view').style.display = 'none';
  document.querySelector('#single-email').style.display='none';

  // Show the mailbox name
  document.querySelector('#emails-view').innerHTML = `<h3>${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h3>`;

  if(mailbox==="inbox")
  {


    


      

  



        const inbox="inbox";
        fetch('/emails/inbox')
        .then(response => response.json())
        .then(function(emails){

          appendData(emails,inbox);
          document.querySelector('#archive-unarchive').style.display='inline';
          
          document.querySelector('#archive-unarchive').innerHTML='archive';
          


         

        });

       

    
  } else if(mailbox==="sent")
  {     

        
        const sent="sent";
        fetch('/emails/sent')
        .then(response => response.json())
        .then(function(emails) {
          // Print emails
          appendData(emails,sent);
          document.querySelector('#archive-unarchive').style.display='none';
         // ... do something else with emails ...


         

          
          
          
      
      }); 


  } 
  else
  {
         
          const archive="archive";
          fetch('/emails/archive')
          .then(response => response.json())
          .then(function(emails) {
            // Print emails
            appendData(emails,archive)
            document.querySelector('#archive-unarchive').style.display='inline';
            document.querySelector('#archive-unarchive').innerHTML='unarchive';
        
            // ... do something else with emails ...
        }); 

  }

}






function appendData(data,mailbox) {
    var mainContainer = document.getElementById("emails-view");
    for (var i = 0; i < data.length; i++) {
        var div = document.createElement("div");
        div.className="inbox-styling";
        div.id=data[i].id;
        var para_sender=document.createElement("p");
        var para_subject=document.createElement("p");
        var para_timestamp=document.createElement("p");
        para_sender.id="email-para";
        para_subject.id="email-subject";
        para_timestamp.id="email-timestamp";
        div.appendChild(para_sender);
        div.appendChild(para_subject);
        div.appendChild(para_timestamp);
        para_sender.innerHTML=data[i].sender;
        para_subject.innerHTML=data[i].subject;
        para_timestamp.innerHTML=data[i].timestamp;
        if(data[i].read==true)
        {
         
          div.style.backgroundColor='grey';
         

        }

        mainContainer.appendChild(div);


  document.addEventListener('click',event=>{

    const email_id=event.target.id;

    data.forEach(element => {

      if(element.id==email_id){
        
        document.querySelector('#emails-view').style.display='none';
        document.querySelector('#single-email').style.display='block';
        document.querySelector('#from_p').innerHTML=element.sender;
        document.querySelector('#to_p').innerHTML=element.recipients;
        document.querySelector('#subject_p').innerHTML=element.subject;
        document.querySelector('#timestamp_p').innerHTML=element.timestamp;
        document.querySelector('#body_message').innerHTML=element.body;
       
        fetch(`/emails/${element.id}`, {
          method: 'PUT',
          body: JSON.stringify({
              read: true
          })
        })
        document.querySelector('#archive-unarchive').addEventListener('click',()=>{

          if(element.archived)

          {

            fetch(`/emails/${element.id}`, {
              method: 'PUT',
              body: JSON.stringify({
                archived: false
              })
            })

            
           

        



            
          }else{
            fetch(`/emails/${element.id}`, {
              method: 'PUT',
              body: JSON.stringify({
                archived: true
              })
            })
          }
          

         



        });

        document.querySelector('#reply').addEventListener('click',reply_email)

        document.querySelector('#reply-email').innerHTML="Reply email";

        document.querySelector('#compose-recipients').value=element.sender;
        if(element.subject.includes('Re:'))
        {
          document.querySelector('#compose-subject').value = ''+element.subject;

        }else{

          document.querySelector('#compose-subject').value = 'Re:'+element.subject;

        }

        if(element.body.includes("wrote:"))
        {
          document.querySelector('#compose-body').value = element.timestamp+' '+element.sender+''+element.body;

        }
        else{
          document.querySelector('#compose-body').value = element.timestamp+' '+element.sender+'  wrote:'+''+element.body;
        }
       
        

      


        




   
       
   
   
      }
      
    });
    
    
});

  


 

 
  
}



      

      
  }


  function reply_email() {

    // Show compose view and hide other views
    document.querySelector('#emails-view').style.display = 'none';
    document.querySelector('#compose-view').style.display = 'block';
    document.querySelector('#single-email').style.display='none';
  
  
  
  
    document.querySelector('#submit').addEventListener('click',()=>{
  
      var recipentmessage = document.querySelector('#compose-recipients').value;
      var subjectmessage= document.querySelector('#compose-subject').value;
      var bodymessage = document.querySelector('#compose-body').value;
  
      
  
      if(subjectmessage.includes("Re:")){


        fetch('/emails', {
          method: 'POST',
          body: JSON.stringify({
              recipients:recipentmessage,
              subject:subjectmessage,
              body:bodymessage
          })
        })
        .then(response => response.json())
        .then(result => {
            // Print result
            console.log(result);
        });



      }
      
  
  
   
  
  
  
   })
  }










