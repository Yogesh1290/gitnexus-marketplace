import aiTools from './categories/ai-tools/registry.json';
import devTools from './categories/dev-tools/registry.json';
import productivity from './categories/productivity/registry.json';
import webApps from './categories/web-apps/registry.json';
import utilities from './categories/utilities/registry.json';

export interface App {
    id: string;
    name: string;
    description: string;
    author: string;
    repo: string;
    bundleUrl: string;
    tags: string[];
    addedAt: string;
}

export interface Category {
    slug: string;
    label: string;
    description: string;
    icon: string;
    apps: App[];
}

export const CATEGORIES: Category[] = [
    {
        slug: 'ai-tools',
        label: 'AI Tools',
        description: aiTools.description,
        icon: '🤖',
        apps: aiTools.apps as App[],
    },
    {
        slug: 'dev-tools',
        label: 'Dev Tools',
        description: devTools.description,
        icon: '🛠️',
        apps: devTools.apps as App[],
    },
    {
        slug: 'productivity',
        label: 'Productivity',
        description: productivity.description,
        icon: '⚡',
        apps: productivity.apps as App[],
    },
    {
        slug: 'web-apps',
        label: 'Web Apps',
        description: webApps.description,
        icon: '🌐',
        apps: webApps.apps as App[],
    },
    {
        slug: 'utilities',
        label: 'Utilities',
        description: utilities.description,
        icon: '🔧',
        apps: utilities.apps as App[],
    },
];

export function getCategoryBySlug(slug: string): Category | undefined {
    return CATEGORIES.find(c => c.slug === slug);
}

export function getAllApps(): App[] {
    return CATEGORIES.flatMap(c => c.apps);
}
