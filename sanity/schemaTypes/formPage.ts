import {defineArrayMember, defineField, defineType} from 'sanity'
import {EnvelopeIcon} from '@sanity/icons/Envelope'
import {LinkIcon} from '@sanity/icons/Link'

export const formPage = defineType({
  name: 'formPage',
  title: 'Newsletter Page',
  type: 'document',
  icon: EnvelopeIcon,
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      initialValue: 'Learn more',
    }),
    defineField({
      name: 'intro',
      title: 'Intro Text',
      description: 'Shown above the sign-up form. Use the toolbar for bold, italic, underline and links.',
      type: 'array',
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
                    description: 'e.g. https://example.com, mailto:hello@example.com or /',
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
      name: 'mailchimpUrl',
      title: 'Mailchimp Form URL',
      description:
        'The "action" URL from your Mailchimp embedded form code, e.g. https://xxx.list-manage.com/subscribe/post?u=…&id=…',
      type: 'string',
      validation: (rule) =>
        rule.required().custom((value) =>
          !value || /list-manage\.com\/subscribe\/post\?.*u=.*id=/.test(value)
            ? true
            : 'Should look like https://xxx.list-manage.com/subscribe/post?u=…&id=…',
        ),
    }),
    defineField({
      name: 'buttonLabel',
      title: 'Button Label',
      type: 'string',
      initialValue: 'Subscribe',
    }),
  ],
  preview: {
    prepare: () => ({title: 'Newsletter Page'}),
  },
})
