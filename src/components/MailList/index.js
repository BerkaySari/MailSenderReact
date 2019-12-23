import React from 'react';
import './style.scss';
import MailCredentials from '../../models/MailCredentials';

class MailList extends React.Component {
  constructor(props) {
    super(props)

    this.getData = this.getData.bind(this);

    this.getBearerToken();
    this.getData();
    this.state = { data: [] };
  }

  getData () {
    let mailCredentials = new MailCredentials();
    mailCredentials.serverAddress = "imap.gmail.com";
    mailCredentials.port = 993;
    mailCredentials.mailAddress = "XXXXXXXXXXXXX";
    mailCredentials.mailAddressPassword = "XXXXXXX";


    const token = localStorage.getItem('token');
    return fetch('https://localhost:44368/api/MailBox/GetAllMails', {
      method: 'POST',
      headers:{
        Accept: 'application/json',
                 'Content-Type': 'application/json',
                 'Authorization': "Bearer " + token
         },
         body: JSON.stringify(mailCredentials),
    })
        .then(res => res.json())
        .then(
          (result) => {
            this.setState({ data: result });
          },
          (error) => {
            //throw
          }
        )
    }

  getBearerToken = async() => {
    var body = {
      "username":"admin",
      "password":"tempPassword"
   }
   
    await fetch("https://localhost:44368/token/GetToken", {
      method: 'post',
      headers: {
        'Content-Type':'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(body),
    })
      .then(res => res.json())
      .then((data) => {
        localStorage.setItem("token", data)
      })
      .catch(console.log)
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
               this.state.data.map((item, i) =>
                  
                    <tr key={i}>
                    <th>{i}</th>
                    <td>{item.senderEmailAddress}</td>
                    <td>{item.toEmailAddress}</td>
                    <td>{item.subject}</td>
                    <td>{item.message}</td>
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