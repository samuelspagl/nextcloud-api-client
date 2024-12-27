import { OcsBaseResponse } from "./ocsTypes";

export interface NextcloudInstance {
    version: Version;
    capabilities: Capabilities;
}

export interface Version {
    major: number;
    minor: number;
    micro: number;
    string: string;
    edition: string;
    extendedSupport: boolean;
}

export interface Capabilities {
    theming: Theming;
    [key: string]: any; // Allowing other optional capabilities
}

export interface Theming {
    name: string;
    url: string;
    slogan: string;
    color: string;
    color_text: string;
    color_element: string;
    color_element_bright: string;
    color_element_dark: string;
    logo: string;
    background: string;
    background_text: string;
    background_plain: boolean;
    background_default: boolean;
    logoheader: string;
    favicon: string;
}

export interface UserQuota {
    free: number;
    used: number;
    total: number;
    relative: number;
    quota: number;
  }
  
  export interface BackendCapabilities {
    setDisplayName: boolean;
    setPassword: boolean;
  }
  
  export interface UserInfo {
    enabled: boolean;
    id: string;
    lastLogin: number; // Representing a timestamp in milliseconds
    backend: string;
    subadmin: string[]; // Assuming it's an array of subadmin identifiers or roles
    quota: UserQuota;
    manager: string;
    avatarScope: string;
    email: string | null; // email could be null
    emailScope: string;
    additional_mail: string[]; // Array of additional email addresses
    additional_mailScope: string[]; // Scope of additional mail
    displayname: string;
    display_name: string;
    displaynameScope: string;
    phone: string;
    phoneScope: string;
    address: string;
    addressScope: string;
    website: string;
    websiteScope: string;
    twitter: string;
    twitterScope: string;
    fediverse: string;
    fediverseScope: string;
    organisation: string;
    organisationScope: string;
    role: string;
    roleScope: string;
    headline: string;
    headlineScope: string;
    biography: string;
    biographyScope: string;
    profile_enabled: string; // A string but could be a boolean depending on backend
    profile_enabledScope: string;
    groups: string[]; // Array of group names
    language: string;
    locale: string;
    notify_email: string | null; // Notify email could be null
    backendCapabilities: BackendCapabilities;
  }

  export interface Status {
    status: string; // status like "offline"
    message: string | null; // message can be null
    icon: string | null; // icon can be null
    clearAt: number | null; // timestamp when the status will be cleared, or null
  }
  
  export interface AutocompleteSearchResult {
    id: string; // ID of the result (e.g., "testaccount2")
    label: string; // Label of the result (e.g., "testaccount2")
    icon: string; // Icon associated with the result (e.g., "icon-user")
    source: string; // The source of the result (e.g., "users")
    status: Status; // The status information
    subline: string; // Additional information (could be empty)
    shareWithDisplayNameUnique: string; // Unique display name for sharing (e.g., "testaccount2")
  }
  
  export type AutocompleteSearchResults = AutocompleteSearchResult[];
  
  


export type CapabilitiesResponse = OcsBaseResponse<NextcloudInstance>;
export type UserInfoResponse = OcsBaseResponse<UserInfo>;
export type AutocompleteSearchResponse = OcsBaseResponse<AutocompleteSearchResults>;
