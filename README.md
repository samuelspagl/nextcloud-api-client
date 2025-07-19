# Nextcloud Apps TS Client

Some AI-Mimimi for the beginning:
> A powerful API client for Nextcloud apps, written in TypeScript. This client provides an easy way to interact with various Nextcloud apps, including Bookmarks, Deck, and Notes. Additionally, you can use the `NextcloudAuthClient` to handle authentication based on the LoginFlowV2 proposed by Nextcloud. The "General" app includes calls for capabilities and auto-completion.

I created this client out of personal curiosity to
* a) create an npm package
* b) a personal project using deck / notes and bookmark

I am not sure how much support I can give, but lets see.

## 📦 Installation

```bash
bun add @samuelspagl/nc-api-client
```

## 🔧 Development Setup

1. Clone the repository
2. Install dependencies: `bun install`
3. Copy environment template: `cp .env.example .env`
4. Fill in your Nextcloud credentials in `.env`
5. Copy bun config if needed: `cp bunfig.toml.example bunfig.toml`

**⚠️ Security Note**: Use Nextcloud app passwords, not your main password. See [SECURITY.md](./SECURITY.md) for details.

## 📚 Features

### General Functions
* Capabilities: Retrieve the capabilities of the Nextcloud instance.
* User Info: Retrieve the information of the user
* Auto-completion: User and group auto-completion.
### Bookmarks App
* Manage Bookmarks: Create, update, retrieve, and delete bookmarks.
* Manage Folders: Create, update, retrieve, and delete folders.
* Manage Tags: Retrieve, rename, and delete tags.
* Manage Shares: Create, update, retrieve, and delete shares.
### Deck App
* Manage Boards: Create, update, retrieve, and delete boards.
* Manage Stacks: Create, update, retrieve, and delete stacks.
* Manage Cards: Create, update, retrieve, and delete cards.
* Manage Labels: Create, update, retrieve, and delete labels.
* Manage Attachments: Upload, retrieve, and delete attachments.
### Notes App
* Manage Notes: Create, update, retrieve, and delete notes.
* Manage Settings: Retrieve and update note settings.
### Authentication
* LoginFlowV2: Handle authentication based on the LoginFlowV2 proposed by Nextcloud.

## 🛠️ Usage

```js
import { NextcloudClient } from '@samuelspagl/nc-api-client';

const client = new NextcloudClient('https://cloud.example.com', 'username', 'password');

async function fetchBookmarks() {
    try {
        const bookmarks = await client.bookmarks.queryBookmarks();
        console.log('Fetched bookmarks:', bookmarks);
    } catch (error) {
        console.error('Error fetching bookmarks:', error);
    }
}
```

One can also import the single clients from:

```js
import { DeckClient, GeneralClient, AuthClient, BookmarksClient, NotesClient } from '@samuelspagl/nc-api-client/scopes';
```

## 📱 Other Apps

Other apps can be added, just open a PR add the new client and some tests 🤓

## 📄 License

I didn't think of a licence yet 🤷🏻‍♂️