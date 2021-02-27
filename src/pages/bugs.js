import React from "react";
import Link from "gatsby-link";
import Helmet from "react-helmet";
import { navigateTo } from "gatsby-link";

function encode(data) {
  const formData = new FormData();

  for (const key of Object.keys(data)) {
    formData.append(key, data[key]);
  }

  return formData;
}

export default class Contact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleAttachment = e => {
    this.setState({ [e.target.name]: e.target.files[0] });
  };

  handleSubmit = e => {
    e.preventDefault();
    const form = e.target;
    fetch("/", {
      method: "POST",
      body: encode({
        "form-name": form.getAttribute("name"),
        ...this.state
      })
    })
      .then(() => navigateTo(form.getAttribute("action")))
      .catch(error => alert(error));
  };

  render() {
    return (
      <div>
        <h1 style={{ color: 'white' }}>Bug Reports</h1>
        <form
          name="bugs"
          method="post"
          action="/thanks/"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
          onSubmit={this.handleSubmit}
        >
          {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
          <input type="hidden" name="form-name" value="file-upload" />
          <p hidden>
            <label>
              Don’t fill this out:{" "}
              <input name="bot-field" onChange={this.handleChange} />
            </label>
          </p>
          <p style={{ color: 'white' }}>
            <label>
              Your Discord Username | Ex: ToxicDev#0001:<br />
              <input type="text" style={{ width: '75%' }} name="name" onChange={this.handleChange} />
            </label>
          </p>
          <p style={{ color: 'white' }}>
            <label>
             Describe your issue? And what service it is with (ie: Logs Script) Please be as descriptive as possible here Dont just say three words!:<br />
              <textarea name="contact" style={{ width: '75%' }} onChange={this.handleChange} />
            </label>
          </p>
          <p style={{ color: 'white' }}>
            <label>
              Provide a Screenshot:<br />
              <input
                type="file"
                name="attachment"
                onChange={this.handleAttachment}
              />
            </label>
          </p>
          <p style={{ color: 'white' }}>
            <label>
             Provide a link or email where we can contact you if we need to! Can be a Discord Server, Twitter etc:<br />
              <textarea name="contact" style={{ width: '75%' }} onChange={this.handleChange} />
            </label>
          </p>
          <p>
            <button type="submit">Send</button>
          </p>
        </form>
      </div>
    );
  }
}