import React from 'react'
import { Link } from 'react-router-dom'
class AnimalTr extends React.Component {
    state = { userActivities: [] }

    createBlocks = () => {
        const blocks = this.props.animal.map((act) => {
            return (
                <tr>
                    <td><Link to={"animal/" + act['id']}>{act['name']}</Link></td>
                    <td><Link to={"animal/" + act['id']}>{act['species']}</Link></td>
                    <td><Link to={"account/" + act['id']}>{act['role']}</Link></td>

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

export default AnimalTr