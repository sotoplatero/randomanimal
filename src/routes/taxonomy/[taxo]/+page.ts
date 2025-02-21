import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { iconicTaxa } from '$lib/iconicTaxa';

export const load: PageLoad = ({ params }) => {
    const taxo = params.taxo;
    const taxoData = iconicTaxa.find(s => s.name.toLowerCase() === taxo.toLowerCase());

    if (!taxoData) {
        throw error(404, {
            message: 'Taxonomy not found'
        });
    }

    return {
        taxo: taxoData
    };
};
