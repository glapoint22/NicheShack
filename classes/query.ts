export interface Query {
    queryType: QueryType;
    logicalOperator: LogicalOperatorType;
    comparisonOperator?: ComparisonOperatorType;
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
    ProductPrice,
    ProductRating,
    ProductKeywords,
    ProductCreationDate,
    SubQuery,
    Auto
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