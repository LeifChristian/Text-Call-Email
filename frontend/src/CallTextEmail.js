import React, { Component } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
const { REACT_APP_MY_ENV } = process.env;

// to enable auto login, make value: "111" in state, and put this.handleSubmit() inside of componentDidMount
//to disable auto login, make value null and remove this.handleSubmit() from componentDidMount

class CallTextEmail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: 111,
      errors: {},
      isLoggedIn: false,
      thing: null,
      sessionID: "",
      latestData: null,
      pm2Data: null,
      enteredNumber: null,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.getHosts = this.getHosts.bind(this);
    this.getAlerts = this.getAlerts.bind(this);
    this.getPing = this.getPing.bind(this);
    this.getTriggers = this.getTriggers.bind(this);
    this.getProblems = this.getProblems.bind(this);
    this.refresh = this.refresh.bind(this);
    this.getPM2 = this.getPM2.bind(this);
    this.sendText = this.sendText.bind(this);
    this.sendEmail = this.sendEmail.bind(this);
    this.sendVoice = this.sendVoice.bind(this);
    this.clear = this.clear.bind(this);
  }

  componentDidMount() {
    this.handleSubmit();
  }

  async handleSubmit(event) {
    event?.preventDefault();
    this.state.password == REACT_APP_MY_ENV
      ? this.setState({ sessionID: "ok" })
      : alert("no");

    // alert("A name was submitted: " + this.state.value + this.state.value1);

    // await axios.post("/login", userData).then((response) => {
    //   if (response?.data?.result?.sessionid) {
    //     console.log(response.data.result.sessionid);
    //     let theID = response.data.result.sessionid;
    //     this.setState({ sessionID: theID });
    //   } else {
    //     alert("Invalid Login");
    //   }
    // });
  }

  handleChange2(e) {
    this.setState({ value: e.target.value });
  }

  handleChange(e) {
    // console.log(e)
    this.setState({ latestData: e.target.value });
  }

  async getHosts() {
    this.setState({ pm2Data: null });
    const sessionData = {
      sessionID: this.state.sessionID,
    };

    await axios.post("/getHosts", sessionData).then((response) => {
      console.log(response.data);
      let theResult = response.data.result;
      this.setState({ latestData: JSON.stringify(theResult) });
    });
  }

  async getProblems() {
    this.setState({ pm2Data: null });
    const sessionData = {
      sessionID: this.state.sessionID,
    };

    await axios.post("/getProblems", sessionData).then((response) => {
      console.log(response.data);
      let theResult = response.data.result;
      this.setState({ latestData: JSON.stringify(theResult) });
    });
  }

  async getTriggers() {
    this.setState({ pm2Data: null });
    const sessionData = {
      sessionID: this.state.sessionID,
    };

    await axios.post("/getTriggers", sessionData).then((response) => {
      console.log(response.data);
      let theResult = response.data.result;
      this.setState({ latestData: JSON.stringify(theResult) });
    });
  }

  async getPing() {
    this.setState({ latestData: "" });
    this.setState({ pm2Data: null });
    const sessionData = {
      sessionID: this.state.sessionID,
    };

    await axios.post("/getPing", sessionData).then((response) => {
      console.log(response.data);
      let theResult = response.data.result;
      this.setState({ latestData: JSON.stringify(theResult) });
    });
  }

  async getAlerts() {
    this.setState({ pm2Data: null });
    const sessionData = {
      sessionID: this.state.sessionID,
    };

    await axios.post("/getAlerts", sessionData).then((response) => {
      console.log(response.data);
      let theResult = response.data.result;
      this.setState({ latestData: JSON.stringify(theResult) });
    });
  }

  async getPM2() {
    this.setState({ latestData: null });
    await axios.get("/getPM2").then((res) => {
      console.log(res.data);
      this.setState({ pm2Data: JSON.stringify(res.data) });
    });
  }

  refresh() {
    window.location.reload(false);
  }

  clear() {
    this.setState({ pm2Data: "" });
    this.setState({ latestData: "" });
    document.getElementById("area").value = "";
  }

  async sendText() {
    let theStuff;

    if (!this.state.latestData && !this.state.pm2Data) {
      alert("no data");
      return;
    }

    this.state.latestData ? (theStuff = this.state.latestData) : console.log();

    this.state.pm2Data ? (theStuff = this.state.pm2Data) : console.log();

    let enteredNumber = prompt("Enter number including area code");

    this.setState({ enteredNumber: enteredNumber });

    let phoneTrim = enteredNumber
      .replaceAll("(", "")
      .replaceAll(")", "")
      .replaceAll("-", "")
      .replaceAll(" ", "");

    // alert(phoneTrim);
    // if (phoneTrim.length !== 10) {
    //   alert("invalid phone number");
    //   return;
    // } else {
    //   console.log();
    // }

    if (phoneTrim.length !== 10) {
      alert("Tha's not a phone number, sending to default 🛸");
    } else {
      console.log();
    }

    const userData = {
      Data: `Leif says: ${theStuff}`,
      Number: phoneTrim ? `+1${phoneTrim}` : "+14065390742",
    };

    await axios.post("/sendText", userData).then((response) => {
      console.log(response);
    });
  }

  async sendVoice() {
    let theStuff;

    if (!this.state.latestData && !this.state.pm2Data) {
      alert("no data");
      return;
    }

    this.state.latestData ? (theStuff = this.state.latestData) : console.log();

    this.state.pm2Data ? (theStuff = this.state.pm2Data) : console.log();

    const voiceNumber = prompt("Enter number including area code");

    this.setState({ enteredNumber: voiceNumber });

    // alert(this.state.enteredNumber2)

    let phoneTrim = voiceNumber
      .replaceAll("(", "")
      .replaceAll(")", "")
      .replaceAll("-", "")
      .replaceAll(" ", "");

    if (phoneTrim.charAt(0) == 1 || phoneTrim.charAt(0) == "1") {
      phoneTrim = phoneTrim.slice(1);
    }

    // alert(phoneTrim);

    if (phoneTrim.length !== 10) {
      alert("Tha's not a phone number, sending to default 🛸");
    } else {
      console.log();
    }

    let timeElapsed = Date.now();
    const today = new Date(timeElapsed);

    const userData = {
      Data: `Leif says!! ${theStuff}`,
      Number: phoneTrim ? `+1${phoneTrim}` : "+14065390742",
    };

    await axios.post("/sendVoice", userData).then((response) => {
      console.log(response);
    });
  }

  async sendEmail() {
    let theStuff;

    // if (!this.state.latestData && !this.state.pm2Data) {
    //   alert("no data");
    //   return;
    // }

    this.state.latestData ? (theStuff = this.state.latestData) : console.log();
    this.state.pm2Data ? (theStuff = this.state.pm2Data) : console.log();

    const enteredEmail = prompt("Enter email");

    if (enteredEmail.length <= 1) {
      alert("Tha's not an email, sending to default 🛸");
    } else {
      console.log();
    }

    const userData = {
      Data: theStuff,
      Email: enteredEmail.includes("@")
        ? enteredEmail
        : "mtmusicandart@gmail.com",
    };

    await axios.post("/sendEmail", userData).then((response) => {
      console.log(response);
    });
  }

  render() {
    const ifSessionID = () => {
      if (this.state.sessionID !== "") {
        // return <div>session ID: {this.state.sessionID}</div>;
        console.log("session ID:", this.state.sessionID);
      }
    };

    const renderAuthButton = () => {
      if (this.state.sessionID !== "") {
        return (
          <>
            <div id="dataReturn">
              {this.state.latestData === "[]"
                ? this.setState({ latestData: "none" })
                : ""}
              {this.state.latestData ? this.state.latestData : ""}
            </div>

            <div id="dataReturn">
              {this.state.pm2Data ? this.state.pm2Data : ""}
            </div>
            <br />
            <form className="">
              <textarea
                id="area"
                type="text"
                rows="3"
                name="body"
                onChange={this.handleChange}
              />
            </form>
            <br />

            <button className="btn btn-primary bt" onClick={this.sendVoice}>
              Send Voice
            </button>
            <button className="btn btn-info bt" onClick={this.sendText}>
              Send Text
            </button>

            <button className="btn btn-success bt" onClick={this.sendEmail}>
              Send Email
            </button>
            <br></br>
            <br></br>
            <button className="btn btn-dark bt" onClick={this.clear}>
              Clear
            </button>
          </>
        );
      } else {
      }
    };

    const loginForm = () => {
      if (this.state.sessionID === "") {
        return (
          <>
            <form onSubmit={this.handleSubmit}>
              <label for="Password" id="pw">
                Password{" "}
              </label>
              <br></br>
              <input
                type="password"
                name="Password"
                id="Password"
                onChange={this.handleChange2}
              />
              <br></br>
              <button className="btn btn-primary" type="submit" value="Submit">
                Submit
              </button>
            </form>
          </>
        );
      }
    };

    return (
      <>
        <div>
          <div id="container">
            <div id="content">
              <br />
              <h3>Call Text Email</h3>
              {loginForm()}
              {ifSessionID()}
              {renderAuthButton()} <br />
              <br></br>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default CallTextEmail;
