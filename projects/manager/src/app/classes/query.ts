import { KeyValue } from '@angular/common';
import { QueryService } from '../services/query.service';
import { Category } from './category';

export interface Query {
    operator: boolean;
    valueType: ValueType;
    getList?();
}

export enum ValueType {
    None,
    List,
    Text,
    MultiText,
    SearchText,
    Date
}


export class QueryNone implements Query {
    valueType = ValueType.None;
    operator = null;
}


export class QueryCategory implements Query {
    constructor(private categories: Array<Category>) { }
    valueType = ValueType.List;
    operator = false;

    getList() {
        let categoryList: Array<KeyValue<any, any>> = this.categories.map(x => ({
            key: x.name,
            value: x.id
        }))
        return categoryList;
    }
}

export class QueryNiche implements Query {
    valueType = ValueType.List;
    operator = false;
    getList() {
        let nicheList: Array<KeyValue<any, any>> = [
            { key: "Niche1", value: "Niche1" },
            { key: "Niche2", value: "Niche2" },
            { key: "Niche3", value: "Niche3" },
            { key: "Niche4", value: "Niche4" },
            { key: "Niche5", value: "Niche5" },
            { key: "Niche6", value: "Niche6" }
        ];
        return nicheList;
    }
}


export class QuerySubgroup implements Query {
    valueType = ValueType.List;
    operator = false;
    getList() {
        let subgroupList: Array<KeyValue<any, any>> = [
            { key: "Subgroup1", value: "Subgroup1" },
            { key: "Subgroup2", value: "Subgroup2" },
            { key: "Subgroup3", value: "Subgroup3" },
            { key: "Subgroup4", value: "Subgroup4" },
            { key: "Subgroup5", value: "Subgroup5" },
            { key: "Subgroup6", value: "Subgroup6" }
        ];
        return subgroupList;
    }
}


export class QueryRating implements Query {
    valueType = ValueType.List;
    operator = true;
    getList() {
        let ratingList: Array<KeyValue<any, any>> = [
            { key: "0", value: "0" },
            { key: "1", value: "1" },
            { key: "2", value: "2" },
            { key: "3", value: "3" },
            { key: "4", value: "4" },
            { key: "5", value: "5" }
        ];
        return ratingList;
    }
}


export class QueryPrice implements Query {
    valueType = ValueType.Text;
    operator = true;
}


export class QueryKeywords implements Query {
    valueType = ValueType.MultiText;
    operator = false;
}


export class QueryRelated implements Query {
    valueType = ValueType.List;
    operator = false;
    getList() {
        let relatedList: Array<KeyValue<any, any>> = [
            { key: "List Products", value: "List Products" },
            { key: "Purchased Products", value: "Purchased Products" },
            { key: "Browsed Products", value: "Browsed Products" }
        ];
        return relatedList;
    }
}


export class QueryFeatured implements Query {
    valueType = ValueType.SearchText;
    operator = false;
}



export class QueryDate implements Query {
    valueType = ValueType.Date;
    operator = true;
}