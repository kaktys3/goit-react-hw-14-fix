import './ImageGalleryItem.css'
import { Component } from 'react'

export default class ImageGalleryItem extends Component {
    render() {
        const {img, largeImg, modalImg} = this.props

        return (
            <>
                <li className="ImageGalleryItem">
                    <img className='ImageGalleryItem-image' onClick={() => modalImg(largeImg)} src={img} alt="" />
                </li>
            </>
        )
    }
}

