import React from 'react'
import { Link } from 'react-router-dom'
import "./css/AnimalTr.css";

class AnimalTr extends React.Component {
    state = { userActivities: [] }
    onClick(id) {
        window.location.href = "animal/" + id;
    }

    imageBack(location) {
        if (location != null) {
            return <img src={location} alt='brak' class="image" width="20" height="20" />
        } else {
            return <div style={{}}></div>
        }
    }

    createBlocks = () => {
        const blocks = this.props.animal.map((act) => {
            return (
                <tr role="button" onClick={() => this.onClick(act['id'])} style={{ cursor: "pointer" }}>
                    <td>
                        <Link to={act['id']}>
                            <div class="margi">{this.imageBack(act['pictureLocation'])}</div>

                            <div>
                                <label class="var">{act['name']}</label>
                            </div>
                        </Link>
                    </td>
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