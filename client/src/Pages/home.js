import React, { Component } from "react";
import "./home.css";
import logo from "./icon.png";

class Home extends Component {
  state = {};

  constructor(props) {
    super(props);
    this.state = { route: "" };
  }

  handleChange = event => {
    let route = "/priceMatch?productname=" + event.target.value;
    this.setState({ route: route });
    
  };

  handleOnClick = event => {
    //read txt of id
    let text = document.getElementById("myText").value;
    //create a input box with the value 
    let input = document.createElement("input");
    input.setAttribute("value", text);
    input.setAttribute("id", "newContent");
    let li = document.createElement("li");
    //let textNode = document.createTextNode(text);
    li.appendChild(input);
    //document.getElementById("list").innerHTML = x;
    document.getElementById("list").appendChild(li);

    //document.getElementById("myText").value = "";
    //let myNodelist = document.getElementsByTagName("li");
    //let i;
    //for (i = 0; i < myNodelist.length; i++) {
    let spanEdit = document.createElement("span");
    let txtEdit = document.createTextNode("Edit");
    spanEdit.className = "edit";
    spanEdit.type = "button";
    spanEdit.onclick = function() {
      let x = document.getElementById("newContent").value;
      var div = this.parentElement;
      div.style.display = x;
    };
    spanEdit.appendChild(txtEdit);
    li.appendChild(spanEdit);

    //create button delete
    let span = document.createElement("span");
    let del = document.createTextNode("delete");
    //span.className = "close";
    span.setAttribute("className", "close");
    span.appendChild(del);
    li.appendChild(span);
    //myNodelist[i].appendChild(span);
    //}
    //document.getElementById("list").appendChild(btn);
    // Click on a close button to hide the current list item

    var close = document.getElementsByClassName("close");
    var i;
    for (i = 0; i < close.length; i++) {
      close[i].onclick = function() {
        var div = this.parentElement;
        div.style.display = "none";
      };
    }
  };

  render() {
    return (
      <div>
        <input type="text" id="myText" />
        <button onClick={this.handleOnClick}>Add</button>
        <ul id="list" />

        <img src={logo} className="logo" />
        <div className="input-group ">
          <div className="input-group-prepend">
            <span className="input-group-text" id="basic-addon3">
              localhost:3000/
            </span>
          </div>

          <input
            type="text"
            className="form-control"
            id="basic-url"
            aria-describedby="inputGroup-sizing-default"
            onChange={this.handleChange}
          />

          <a
            href={this.state.route}
            className="btn btn-outline-success "
            type="submit"
          >
            Search
          </a>
        </div>
      </div>
    );
  }
}

export default Home;
