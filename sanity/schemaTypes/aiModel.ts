import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'aiModel',
  title: 'AI Model',
  type: 'document',
  fields: [
    defineField({
      name: 'modelName',
      title: 'Model Name',
      type: 'string',
      validation: rule => rule.required()
    }),
    defineField({
      name: 'company',
      title: 'Company',
      type: 'reference',
      to: [{type: 'company'}],
      validation: rule => rule.required()
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{type: 'category'}],
      validation: rule => rule.required()
    }),
    defineField({
      name: 'rank',
      title: 'Rank',
      type: 'number',
      validation: rule => rule.required().min(1)
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4
    }),
    defineField({
      name: 'serviceLink',
      title: 'Service Link',
      type: 'url'
    }),
    defineField({
      name: 'cheapestOption',
      title: 'Cheapest Option',
      type: 'string',
      description: 'e.g. "Free", "20$/Month", "$0.60/1M tokens"'
    }),
    defineField({
      name: 'apiAvailable',
      title: 'API Available',
      type: 'boolean',
      initialValue: false
    })
  ],
  orderings: [
    {
      title: 'Rank',
      name: 'rankAsc',
      by: [{field: 'rank', direction: 'asc'}]
    }
  ],
  preview: {
    select: {
      title: 'modelName',
      subtitle: 'company.name',
      rank: 'rank'
    },
    prepare({title, subtitle, rank}) {
      return {
        title: `#${rank} ${title}`,
        subtitle
      }
    }
  }
})
