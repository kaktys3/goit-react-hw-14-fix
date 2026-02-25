import Searchbar from './components/Searchbar/Searchbar.jsx'
import ImageGallery from './components/ImageGallery/ImageGallery.jsx'
import ImageGalleryItem from './components/ImageGalleryItem/ImageGalleryItem.jsx'
import Modal from './components/Modal/Modal.jsx'
import MyLoader from './components/Loader/Loader.jsx'
import Button from './components/Button/Button.jsx'
import { Component } from 'react'
import axios from 'axios';
import './App.css'

export default class App extends Component {
  state = {
    images: [],
    page: 1,
    perPage: 12,
    modalImg: '',
    filter: '',
    loader: false,
    scrollPosition: 0
  }

  windowKey = () => {
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.setState({
          modalImg: ''
        })
      }
    })
  }

  async componentDidUpdate(prevProps, prevState) {

    if (prevState.page != this.state.page) {
      this.scrollPosition = window.scrollY
      this.setState({
        loader: true
      })
      
      const response = await axios.get(`https://pixabay.com/api/?key=54704699-3f81b1e0c8e2f8e619912e89c&q=${this.state.filter}&image_type=photo&orientation=horizontal&page=${this.state.page}&per_page=${this.state.perPage}`)

      this.setState({
        images: [...this.state.images, ...response.data.hits],
        loader: false
      }, () => window.scrollTo(0, this.scrollPosition))
    }

    if (prevState.filter != this.state.filter) {
      this.setState({
        page: 1,
        loader: true
      })

      const response = await axios.get(`https://pixabay.com/api/?key=54704699-3f81b1e0c8e2f8e619912e89c&q=${this.state.filter}&image_type=photo&orientation=horizontal&page=1&per_page=${this.state.perPage}`)

      this.setState({
        images: response.data.hits,
        loader: false
      })
    }

    this.windowKey()
  }

  loaderButton = () => {
    this.setState({
      page: this.state.page + 1
    })
  }

  modalImg = (img) => {
    this.setState({
      modalImg: img
    })
  }

  filterInfo = (info) => {
    this.setState({
      filter: info,
      page: 1
    })
  }

  render() {
    const { images, modalImg, filter, page, loader } = this.state
    console.log(page)

    return (
      <>
        <Searchbar infoFilter={this.filterInfo} />
        {loader && <MyLoader />}
        {!loader && <ImageGallery>
          {images.map(e => (
            <ImageGalleryItem key={e.id} img={e.webformatURL} largeImg={e.largeImageURL} modalImg={this.modalImg} />
          ))}
        </ImageGallery>}

        <Button load={this.loaderButton} none={filter} />
        <Modal modalImg={modalImg} />
      </>
    )
  }
}


