export interface Query {
    queryType: QueryType;
    comparisonOperator: ComparisonOperatorType;
    logicalOperator: LogicalOperatorType;
    intValue?: number;
    intValues?: Array<number>;
    stringValue?: string;
    stringValues?: Array<string>;
    doubleValue?: number;
    dateValue?: Date;
    subQueries?: Array<Query>;
}


export enum QueryType {
    None,
    Category,
    Niche,
    ProductSubgroup,
    FeaturedProducts,
    CustomerRelatedProducts,
    ProductPrice,
    ProductRating,
    ProductKeywords,
    ProductCreationDate,
    SubQuery
}


export enum ComparisonOperatorType {
    Equal = 1,
    NotEqual,
    GreaterThan,
    GreaterThanOrEqual,
    LessThan,
    LessThanOrEqual
}


export enum LogicalOperatorType {
    And = 1,
    Or
}