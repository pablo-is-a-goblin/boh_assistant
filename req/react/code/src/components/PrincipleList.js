import React, { Component } from "react";
import { Table } from "reactstrap";
import NewPrincipleModal from "./NewPrincipleModal";
import ConfirmRemovalModal from "./ConfirmRemovalModal";

class PrincipleList extends Component {
  render() {
    const principles = this.props.principles;
    return (
      <Table dark>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {!principles || principles.length <= 0 ? (
            <tr>
              <td colSpan="6" align="center">
                <b>Ops, no one here yet</b>
              </td>
            </tr>
          ) : (
            principles.map(principle => (
              <tr key={principle.pk}>
                <td>{principle.name}</td>
                <td>{principle.description}</td>
                <td><img src={principle.image} alt={principle.name}></img></td>
                <td align="center">
                  <NewPrincipleModal
                    create={false}
                    principle={principle}
                    resetState={this.props.resetState}
                  />
                  &nbsp;&nbsp;
                  <ConfirmRemovalModal
                    pk={principle.pk}
                    resetState={this.props.resetState}
                  />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    );
  }
}

export default PrincipleList;