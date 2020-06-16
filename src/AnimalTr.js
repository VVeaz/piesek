import React from 'react'
import { Link } from 'react-router-dom'
class AnimalTr extends React.Component {
    state = { userActivities: [] }
    onClick(id) {
        window.location.href = "animal/" + id;
    }

    createBlocks = () => {
        const blocks = this.props.animal.map((act) => {
            return (
                <tr role="button" onClick={() => this.onClick(act['id'])} style={{ cursor: "pointer" }}>
                    <td><Link to={act['id']}>{act['name']}</Link></td>
                    <td><Link to={act['id']}>{act['species']}</Link></td>
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