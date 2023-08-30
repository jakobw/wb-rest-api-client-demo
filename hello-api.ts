import { LabelsApi } from './api-client/api';
import { Options as RequestOptions } from 'request';

const api = new LabelsApi( 'https://wikidata.beta.wmflabs.org/w/rest.php/wikibase/v0' );
api.addInterceptor( ( options: RequestOptions ) => {
    options.headers = {
        ...options.headers,
        'User-agent': 'WikibaseRestApiDemoClient/0.0',
    };
} );

const itemId = 'Q11';
api.getItemLabel( itemId, 'en' ).then( ( response ) => {
    console.log( `the label of "${itemId}" is "${response.body}"` );
} );
