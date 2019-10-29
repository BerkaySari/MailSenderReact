import React from 'react';
import './style.scss';
import MailCredentials from '../../models/MailCredentials';

let List = [];
class MailList extends React.Component {
  constructor(props) {
    super(props)

    this.getData = this.getData.bind(this);

    List =  this.getData();
  }

  getData= async () => {
    var xhr = new XMLHttpRequest()

    xhr.addEventListener('load', () => {
      console.log(xhr.responseText)
    })

    //xhr.open('GET', 'https://dog.ceo/api/breeds/list/all')
    xhr.open('POST', 'https://localhost:44368/api/MailBox/GetAllMails')

    // xhr.setRequestHeader('Content-Type', 'text/plain');
    xhr.setRequestHeader('Content-Type', 'application/json');

    let mailCredentials = new MailCredentials();
    mailCredentials.serverAddress = "imap.gmail.com";
    mailCredentials.port = 993;
    mailCredentials.mailAddress = "xxxxxxxxxxxxx";
    mailCredentials.mailAddressPassword = "xxxxxxxxx";

    xhr.send(JSON.stringify(mailCredentials))
  }

  render() {
    return (
      <div className={'table-responsive'}>
      <table className={"table table-hover table-bordered"}>
         <thead className={"bg-success text-light"}>
            <tr>
               <th>#</th>
               <th>From</th>
               <th>To</th>
               <th>Subject</th>
               <th>Message</th>
            </tr>
         </thead>
         <tbody>
            {
               List.map((item, i) =>
                  
                    <tr>
                    <th></th>
                    <td>{item.SenderEmailAddress}</td>
                    <td>{item.ToEmailAddress}</td>
                    <td>{item.Subject}</td>
                    <td>{item.Message}</td>
                </tr>
                  
               )
            }
         </tbody>
      </table>
   </div>
    );
  }
}

export default MailList;