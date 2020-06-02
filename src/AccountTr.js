import React from 'react'

class AccountTr extends React.Component {
    state = { userActivities: [] }

    createBlocks = () => {
        const blocks = this.props.accounts.map((act) => {
            return (
                <tr>
                    <td>{act['name']}</td>
                    <td>{act['lastName']}</td>
                    <td>{act['role']}</td>
                    <td>{act['email']}</td>
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