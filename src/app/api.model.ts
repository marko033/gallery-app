export interface GalleryData {
    galleries: Gallery[];
}

export interface Gallery {
    path:   string;
    image?: Image;
    name:   string;
}

export interface Image {
    path:     string;
    fullpath: string;
    name:     string;
    modified: string;
}