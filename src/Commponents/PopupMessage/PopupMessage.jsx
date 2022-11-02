
import { PureComponent } from 'react';
import style from './PopupMessage.module.css'
class PopupMessage extends PureComponent {
    state = {}
    render() {
        const { message } = this.props

        return (
            <div className={`${style.alert} ${style.show}`}>
                <span className={style.msg}>{message}</span>
            </div>
        );
    }
}

export default PopupMessage;