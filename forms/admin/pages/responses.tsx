import * as React from 'react'
import { DataBindingProvider, DataGrid, DateCell, EditPage, EntitySubTree, FeedbackRenderer, Field, GenericCell, HasMany, HasOneSelectCell, LayoutPage, LinkButton, NavigateBackButton, StaticRender } from '@contember/admin'
import locale from '../locales'

export const responseList = () => (
	<DataBindingProvider stateComponent={FeedbackRenderer}>
		<EntitySubTree entity="Form(id = $id)">
			<LayoutPage title={<>{locale['Responses from']} <Field field="title" /></>} navigation={<NavigateBackButton to="formList">{locale['Forms']}</NavigateBackButton>}>
				<DataGrid entities="Response[form.id = $id]" itemsPerPage={50}>
					<DateCell field="createdAt" header={locale['Created at']} initialOrder="desc" />
					<GenericCell shrunk>
						<LinkButton to="responseView(id: $entity.id)">{locale['View']}</LinkButton>
					</GenericCell>
				</DataGrid>
			</LayoutPage>
			<StaticRender>
				<Field field="title" />
			</StaticRender>
		</EntitySubTree>
	</DataBindingProvider>
)

export const responseView = (
	<EditPage
		entity="Response(id = $id)"
		rendererProps={{ navigation: <NavigateBackButton to="responseList(id: $entity.form.id)">Responses</NavigateBackButton> }}
	>
		<Field field="createdAt" />
		<br /><br />
		<HasMany field="answers">
			<Field field="input.question" />
			<br />
			<Field field="value" />
			<br /><br />
		</HasMany>

		<StaticRender>
			<Field field="form.id" />
		</StaticRender>
	</EditPage>
)
