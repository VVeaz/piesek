import React from 'react'

class AnimalTr extends React.Component {
    state = { userActivities: [] }

    createBlocks = () => {
        const blocks = this.props.animal.map((act) => {
            return (
                <tr>
                    <td>{act['name']}</td>
                    <td>{act['speceis']}</td>
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