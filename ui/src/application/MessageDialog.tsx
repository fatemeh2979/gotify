import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import React, {Component} from 'react';

interface IProps {
    fClose: VoidFunction;
    fOnSubmit: (title: string, message: string, token:string, priority:number) => void;
}

interface IState {
    title: string;
    message: string;
    token: string;
    priority:number;
}

export default class AddDialog extends Component<IProps, IState> {
    public state = {title: '', message: '', token: '',priority:5};

    public render() {
        const {fClose, fOnSubmit} = this.props;
        const {title, message, token,priority} = this.state;
        const submitEnabled = this.state.title.length !== 0;
        const submitAndClose = () => {
            fOnSubmit(title, message, token,priority);
            fClose();
        };
        return (
            <Dialog
                open={true}
                onClose={fClose}
                aria-labelledby="form-dialog-title"
                id="app-dialog">
                <DialogTitle id="form-dialog-title">Create an Message</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                    Here You Can Send Your Notif.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        className="token"
                        label="token *"
                        type="text"
                        value={token}
                        onChange={this.handleChange.bind(this, 'token')}
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        className="title"
                        label="title *"
                        type="text"
                        value={title}
                        onChange={this.handleChange.bind(this, 'title')}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        className="message"
                        label="Short message"
                        value={message}
                        onChange={this.handleChange.bind(this, 'message')}
                        fullWidth
                        multiline
                    />
                    <TextField
                        margin="dense"
                        className="priority"
                        label="priority"
                        type="number"
                        value={priority}
                        onChange={this.handleChange.bind(this, 'priority')}
                        fullWidth
                        multiline
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={fClose}>Cancel</Button>
                    <Tooltip title={submitEnabled ? '' : 'title is required'}>
                        <div>
                            <Button
                                className="create"
                                disabled={!submitEnabled}
                                onClick={submitAndClose}
                                color="primary"
                                variant="contained">
                                Send
                            </Button>
                        </div>
                    </Tooltip>
                </DialogActions>
            </Dialog>
        );
    }

    private handleChange(propertyName: string, event: React.ChangeEvent<HTMLInputElement>) {
        const state = this.state;
        state[propertyName] = event.target.value;
        this.setState(state);
    }
}
