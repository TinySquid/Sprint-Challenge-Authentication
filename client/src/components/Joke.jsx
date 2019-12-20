import React from "react";

import { Card, CardBody, CardText } from "reactstrap";

function Joke(props) {
  return (
    <div className="joke">
      <Card>
        <CardBody>
          <CardText>{props.joke}</CardText>
        </CardBody>
      </Card>
    </div>
  );
}

export default Joke;
