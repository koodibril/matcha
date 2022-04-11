import create from './handlers/create';
import get from './handlers/get';

export default (req, res) => {
    const { path } = req;

    switch (path) {
        case 'create':
            create(req, res);
            break
        case 'get':
            get();
            break;
    }
}
