import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import AppBar from 'material-ui/AppBar'
import Toggle from 'material-ui/Toggle'
import {Grid, Row, Col, Alert} from 'react-bootstrap'

export default class MyAwesomeReactComponent extends React.Component{
  render() {
    return(
      <div>
        <AppBar
          title="Title"
          iconClassNameRight="muidocs-icon-navigation-expand-more"
        />
        <Grid>
          <Row className="show-grid">
            <Col xs={12} md={6}>
              <Toggle
                label="show"
                defaultToggled={true}
              />
              <RaisedButton label="default" />
            </Col>
          </Row>
        </Grid>

      </div>
    )
  }
}
