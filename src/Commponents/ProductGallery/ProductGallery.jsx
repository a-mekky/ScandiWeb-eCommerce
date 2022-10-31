
import { PureComponent } from 'react';
import style from './ProductGallery.module.css'

class ProductGallery extends PureComponent {
    state = {
        gallery: [],
        index: 0
    }
    componentDidMount() {
        this.setState({ gallery: this.props.gallery })
    }
    render() {
        const { gallery, index } = this.state
        const handleActiveImg = (num) => {
            let newIndex = this.state.index + num
            if (newIndex > gallery.length - 1) {
                this.setState({ index: 0 })
            }
            else if (newIndex < 0) {
                this.setState({ index: gallery.length - 1 })
            }
            else {
                this.setState({ index: newIndex })
            }
        }
        return (
            <>
                <div className={style.slideshow_container}>
                    <div>
                        <img src={gallery[index]} width={this.props.width} height={this.props.height} alt={'ProductImage'}/>
                    </div>
                    {gallery.length > 1 && (
                        <div className={style.imgBtn}>
                            <button className={style.prev} onClick={() => handleActiveImg(-1)}>❮</button>
                            <button className={style.next} onClick={() => handleActiveImg(1)} >❯</button>
                        </div>
                    )}

                </div>
            </>);
    }
}

export default ProductGallery;