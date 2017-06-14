/******************************************************************************
 * $Id: $
 ******************************************************************************
 *
 * Copyright (c) 2016 The Sakai Foundation, The Sakai Quebec Team.
 *
 * Licensed under the Educational Community License, Version 1.0
 * (the "License"); you may not use this file except in compliance with the
 * License.
 * You may obtain a copy of the License at
 *
 *      http://www.opensource.org/licenses/ecl1.php
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 ******************************************************************************/
package ca.hec.tenjin.api.provider;

import ca.hec.tenjin.api.model.syllabus.AbstractSyllabusElement;
import ca.hec.tenjin.api.model.syllabus.SyllabusRubricElement;
import ca.hec.tenjin.api.model.syllabus.SyllabusTextElement;

import java.util.ArrayList;

/**
 *
 * @author <a href="mailto:mame-awa.diop@hec.ca">Mame Awa Diop</a>
 * @version $Id: $
 */
public class CatalogDescriptionProvider extends ExternalDataProvider {

    @Override
    public AbstractSyllabusElement getAbstractSyllabusElement() {

        SyllabusRubricElement descriptionRubric = new SyllabusRubricElement();
        descriptionRubric.setTitle("Description"); //TODO i18n

        SyllabusTextElement descriptionText = new SyllabusTextElement();
        descriptionText.setDescription("this is a text"); // TODO get the text from the db
        descriptionText.setTemplateStructureId(-1L);
        descriptionText.setCommon(true);
        descriptionText.setPublicElement(true);
        descriptionText.setHidden(false);
        descriptionText.setImportant(false);

        ArrayList elements = new ArrayList<AbstractSyllabusElement>();
        elements.add(descriptionText);

        descriptionRubric.setElements(elements);
	    return descriptionRubric;
    }
}

