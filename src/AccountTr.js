import React from 'react'
import { Link, useHistory, withRouter } from 'react-router-dom'

class AccountTr extends React.Component {
    state = { userActivities: [], roles: { 'USER': 'Pracownik', 'ADMINISTRATOR': 'Admin' } }

    onClick(id) {
        window.location.href = "account/" + id;
    }
    onOver() {

    }
    createBlocks = () => {
        const blocks = this.props.accounts.map((act) => {
            return (
                <tr role="button" onClick={() => this.onClick(act['id'])} style={{ cursor: "pointer" }}>
                    <td><Link to={act['id']} className="btn btn-primary">{act['name']}</Link></td>
                    <td><Link to={act['id']}>{act['lastName']}</Link></td>
                    <td><Link to={act['id']}>{this.state.roles[act['role']]}</Link></td>
                    <td><Link to={act['id']}>{act['email']}</Link></td>
                </tr>
            )
        })
        return blocks
    }

    render() {
        return (
            this.createBlocks()

        )
    }
}

export default AccountTr