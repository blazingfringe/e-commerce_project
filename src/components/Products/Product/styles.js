import {makeStyles} from '@material-ui/core/styles';

export default makeStyles( () => ( {
    root: {
        maxWidth: '100%'
    },
    media: {
        height: 0,
        paddingTop: '56.25%', //for 16:9 aspect ratio
    },
    cardActions: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    cardContent: {
        display: 'flex',
        justifyContent: 'space-between',
    },

}));