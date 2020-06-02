import React from 'react'
import { Link } from 'react-router-dom'

class AccountTr extends React.Component {
    state = { userActivities: [] }

    createBlocks = () => {
        const blocks = this.props.accounts.map((act) => {
            return (
                <tr>
                    <td><Link to={"account/" + act['id']}>{act['name']}</Link></td>
                    <td><Link to={"account/" + act['id']}>{act['lastName']}</Link></td>
                    <td><Link to={"account/" + act['id']}>{act['role']}</Link></td>
                    <td><Link to={"account/" + act['id']}>{act['email']}</Link></td>
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