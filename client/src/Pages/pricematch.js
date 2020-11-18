import React, { Component } from "react";
import queryString from "query-string";

class PriceMatch extends Component {
  state = {};

  constructor() {
    super();
    this.state = { product: "" };
  }

  componentDidMount() {
    let product = queryString.parse(this.props.location.search)["productname"];
    this.setState({ product: product });
  }

  render() {
    return <p>{this.state.product}</p>;
  }
}

export default PriceMatch;

