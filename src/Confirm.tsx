import React from 'react'
import './Confirm.css'

interface IProps {
    title: string;
    content: string;
    cancelCaption?: string;
    okCaption?: string;
    onOkClick: () => void;
    onCancelClick: () => void;
    open: boolean;
}

const Confirm: React.SFC<IProps> = (props) => {
    console.log("Confirm rendering");
    const [cancelClickCount, setCancelClickCount] = React.useState(0);
    React.useEffect(() => {
        console.log("Confirm first rendering");
    }, []);

    const handleCancelClick = () => {
        const newCount = cancelClickCount + 1;
        setCancelClickCount(newCount);
        if (newCount >= 2) {
            props.onCancelClick();
        }
    };

    const handleOkClick = () => {
        props.onOkClick();
    };

    const customClass = props.open ? "confirm-wrapper confirm-visible" : "confirm-wrapper "
    return (
        <div className={customClass}>
            <div className="confirm-container">
                <div className="confirm-title-container">
                    <div className="confirm-content-container">
                        <span>{props.title}</span>
                    </div>
                    <div className="confirm-content-container">
                        <p>{props.content}</p>
                    </div>
                    <div className="confirm-buttons-container">
                        <button className="confirm-cancel" onClick={handleCancelClick}>
                            {cancelClickCount === 0 ? props.cancelCaption : "Really?"}
                        </button>
                        <button className="confirm-ok" onClick={handleOkClick}>{props.okCaption}</button>
                    </div>
                </div>
            </div>
        </div>
    )

}

const ConfirmMemo = React.memo(Confirm);

export default ConfirmMemo;



    // class Confirm extends React.Component<IProps>{
    //     public static defaultProps = {
    //         cancelCaption: "Cancel",
    //         okCaption: "Okey"
    //     }

    //     private handleCancelClick = () => {
    //         this.props.onCancelClick();
    //     };

    //     private handleOkClick = () => {
    //         this.props.onOkClick();
    //     };



    //     public render() {
    //         const customClass = this.props.open ? "confirm-wrapper confirm-visible" : "confirm-wrapper "
    //         return (
    //                 <div className={customClass}>
    //                     <div className="confirm-container">
    //                         <div className="confirm-title-container">
    //                             <div className="confirm-content-container">
    //                                 <span>{this.props.title}</span>
    //                             </div>
    //                             <div className="confirm-content-container">
    //                                 <p>{this.props.content}</p>
    //                             </div>
    //                             <div className="confirm-buttons-container">
    //                                 <button className="confirm-cancel" onClick={this.handleCancelClick}>{this.props.cancelCaption}</button>
    //                                 <button className="confirm-ok" onClick={this.handleOkClick}>{this.props.okCaption}</button>
    //                             </div>
    //                         </div>
    //                     </div>
    //                 </div>
    //         )
    //     }
    // }