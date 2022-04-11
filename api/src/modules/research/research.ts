import { getFilter } from './handlers/getFilter';
import { getResearchResult } from './handlers/research';
import { updateFilter } from './handlers/updateFilter';

export default (req: any, res: any) => {
    const { path } = req;

    switch (path) {
        case 'do':
            getResearchResult(req, res);
            break

        case 'update':
            updateFilter(req, res);
            break

        case 'get':
            getFilter(req, res);
            break
    }
}
