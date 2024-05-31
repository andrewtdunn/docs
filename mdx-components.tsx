import * as React from 'react';
import type { Metadata } from 'next';
import type { MDXComponents, MDXProps } from 'mdx/types';
import type { PageNode } from '@/directory/directory';
import type { Platform } from '@/constants/platforms';
import ExportedImage from 'next-image-export-optimizer';
import InlineFilter from './src/components/InlineFilter';
import { YoutubeEmbed } from './src/components/YoutubeEmbed';
import { Accordion } from './src/components/Accordion';
import { Block, BlockSwitcher } from './src/components/BlockSwitcher';
import { Callout } from './src/components/Callout';
import Fragments from './src/components/Fragments';
import {
  MDXCode,
  MDXHeading,
  MDXLink,
  MDXTable
} from './src/components/MDXComponents';
import { MigrationAlert } from './src/components/MigrationAlert';
import preToCodeBlock from './src/utils/pre-to-code-block';
import { Overview } from './src/components/Overview';
import ExternalLink from './src/components/ExternalLink';
import { ExternalLinkButton } from './src/components/ExternalLinkButton';
import { InternalLinkButton } from './src/components/InternalLinkButton';
import { Grid, View } from '@aws-amplify/ui-react';
import { Columns } from './src/components/Columns';
import { Video } from './src/components/Video';

const ResponsiveImage = (props) => (
  <ExportedImage style={{ height: 'auto' }} {...props} />
);

const MDXHeading1 = (props) => <MDXHeading level={1} {...props} />;
const MDXHeading2 = (props) => <MDXHeading level={2} {...props} />;
const MDXHeading3 = (props) => <MDXHeading level={3} {...props} />;
const MDXHeading4 = (props) => <MDXHeading level={4} {...props} />;
const MDXHeading5 = (props) => <MDXHeading level={5} {...props} />;
const MDXHeading6 = (props) => <MDXHeading level={6} {...props} />;

const components = {
   // Map markdown elements to custom components
   a: MDXLink,
   h1: MDXHeading1,
   h2: MDXHeading2,
   h3: MDXHeading3,
   h4: MDXHeading4,
   h5: MDXHeading5,
   h6: MDXHeading6,
   pre: (preProps) => {
     const props = preToCodeBlock(preProps);
     if (props) {
       return <MDXCode {...props} />;
     }
     return <pre {...preProps} />;
   },
   img: ResponsiveImage,
   table: MDXTable,

   // Make common custom components available to content authors
   Accordion,
   Block,
   BlockSwitcher,
   Callout,
   Fragments,
   InlineFilter,
   MigrationAlert,
   YoutubeEmbed,
   Overview,
   ExternalLink,
   ExternalLinkButton,
   InternalLinkButton,
   Grid,
   Columns,
   Video,
   View,
};

/**
 * Type for Next.js's getStaticProps return in MDX pages
 * this is needed to satisfy the type-check for <Overview>'s childPageNodes
 */
type MDXGetStaticPropsResult = {
  meta: Metadata & {
    platforms: Platform[];
  };
  childPageNodes: PageNode[];
};

/**
 * Declare types in the global scope for MDX to type-check
 */
declare global {
  type MDXProvidedComponents = typeof components;
  type Props = MDXProps & MDXGetStaticPropsResult;
}

/**
 * @param _components Next.js components for MDX pages
 * @returns all MDX components available for use in the page without import
 */
export function useMDXComponents(_components: MDXComponents) {
  return {
    ..._components,
    ...components
  };
}
