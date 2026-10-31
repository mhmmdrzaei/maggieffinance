import {defineArrayMember, defineField, defineType} from 'sanity'
import {HomeIcon} from '@sanity/icons/Home'
import {LinkIcon} from '@sanity/icons/Link'

export const homePage = defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  icon: HomeIcon,
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'design', title: 'Design'},
    {name: 'menu', title: 'Menu'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({
      name: 'content',
      title: 'Text',
      description: 'The text on the home page. Use the toolbar for bold, italic, underline and links.',
      type: 'array',
      group: 'content',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [{title: 'Normal', value: 'normal'}],
          lists: [],
          marks: {
            decorators: [
              {title: 'Bold', value: 'strong'},
              {title: 'Italic', value: 'em'},
              {title: 'Underline', value: 'underline'},
            ],
            annotations: [
              {
                name: 'link',
                title: 'Link',
                type: 'object',
                icon: LinkIcon,
                fields: [
                  defineField({
                    name: 'href',
                    title: 'URL',
                    description: 'e.g. https://example.com, mailto:hello@example.com or /form',
                    type: 'string',
                    validation: (rule) => rule.required(),
                  }),
                ],
              },
            ],
          },
        }),
      ],
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
      group: 'design',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative text',
          description: 'Short description of the image for screen readers.',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Background Color',
      description: 'Page background colour behind the text.',
      type: 'color',
      group: 'design',
      options: {disableAlpha: true},
    }),
    defineField({
      name: 'menu',
      title: 'Menu',
      description: 'Links shown at the bottom of the page.',
      type: 'array',
      group: 'menu',
      of: [
        defineArrayMember({
          name: 'menuItem',
          title: 'Menu Item',
          type: 'object',
          icon: LinkIcon,
          fields: [
            defineField({
              name: 'name',
              title: 'Name',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'url',
              title: 'URL',
              description: 'e.g. https://linkedin.com/in/…, mailto:hello@example.com or /form',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {select: {title: 'name', subtitle: 'url'}},
        }),
      ],
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      group: 'seo',
      options: {collapsible: false},
      fields: [
        defineField({
          name: 'description',
          title: 'Description',
          description: 'Shown in search results and link previews (~155 characters).',
          type: 'text',
          rows: 3,
          validation: (rule) => rule.max(300).warning('Keep it short, ideally under 160 characters.'),
        }),
        defineField({
          name: 'image',
          title: 'Share Image',
          description: 'Shown when the site is shared on social media. Ideal size 1200 × 630.',
          type: 'image',
        }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({title: 'Home Page'}),
  },
})
