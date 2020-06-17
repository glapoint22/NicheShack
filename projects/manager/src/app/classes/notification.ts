import { NotificationText } from './notification-text';
import { ListItem } from './list-item';

export interface Notification extends ListItem {
    listIcon: string;
    customerText: NotificationText[];
    notesText?: NotificationText[];
}

export enum NotificationType {
    Message = 'Message',
    ReviewComplaint = 'Review Complaint',
    ProductNameDoesNotMatchWithProductDescription = 'Product Name Doesn\'t Match With Product Description',
    ProductNameDoesNotMatchWithProductImage = 'Product Name Doesn\'t Match With Product Image',
    ProductNameOther = 'Product Name (Other)',
    ProductPriceTooHigh = 'Product Price Too High',
    ProductPriceNotCorrect = 'Product Price Not Correct',
    ProductPriceOther = 'Product Price (Other)',
    VideosAndImagesAreDifferentFromProduct = 'Videos & Images are Different From Product',
    NotEnoughVideosAndImages = 'Not Enough Videos & Images',
    VideosAndImagesNotClear = 'Videos & Images Not Clear',
    VideosAndImagesMisleading = 'Videos & Images Misleading',
    VideosAndImagesOther = 'Videos & Images (Other)',
    ProductDescriptionIncorrect = 'Product Description Incorrect',
    ProductDescriptionTooVague = 'Product Description Too Vague',
    ProductDescriptionMisleading = 'Product Description Misleading',
    ProductDescriptionOther = 'Product Description (Other)',
    ProductReportedAsIllegal = 'Product Reported As Illegal',
    ProductReportedAsHavingAdultContent = 'Product Reported As Having Adult Content',
    OffensiveProductOther = 'Offensive Product (Other)',
    ProductInactive = 'Product Inactive',
    ProductSiteNoLongerInService = 'Product site no longer in service',
    MissingProductOther = 'Missing Product (Other)'
} 

export enum NotificationTab {
    NewNotifications,
    PendingNotifications,
    ArchiveNotifications
}