import { NotificationText } from './notification-text';

export interface Notification {
    type: NotificationType;
    customerText: NotificationText[];
    notesText?: NotificationText[];
}


export enum NotificationType {
    Message,
    ReviewComplaint,
    ProductNameDoesNotMatchWithProductDescription,
    ProductNameDoesNotMatchWithProductImage,
    ProductNameOther,
    ProductPriceTooHigh,
    ProductPriceNotCorrect,
    ProductPriceOther,
    VideosAndImagesAreDifferentFromProduct,
    NotEnoughVideosAndImages,
    VideosAndImagesNotClear,
    VideosAndImagesMisleading,
    VideosAndImagesOther,
    ProductDescriptionIncorrect,
    ProductDescriptionTooVague,
    ProductDescriptionMisleading,
    ProductDescriptionOther,
    ProductReportedAsIllegal,
    ProductReportedAsHavingAdultContent,
    OffensiveProductOther,
    ProductInactive,
    ProductSiteNoLongerInService,
    MissingProductOther
} 

export enum NotificationTab {
    NewNotifications,
    PendingNotifications,
    ArchiveNotifications
}