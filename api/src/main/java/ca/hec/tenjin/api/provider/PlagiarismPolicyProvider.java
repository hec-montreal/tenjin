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

import java.io.IOException;
import java.util.PropertyResourceBundle;
import java.util.ResourceBundle;

import org.sakaiproject.content.api.ContentResource;
import org.sakaiproject.content.cover.ContentHostingService;
import org.sakaiproject.exception.IdUnusedException;
import org.sakaiproject.exception.PermissionException;
import org.sakaiproject.exception.ServerOverloadException;
import org.sakaiproject.exception.TypeException;

import ca.hec.tenjin.api.model.syllabus.AbstractSyllabusElement;
import ca.hec.tenjin.api.model.syllabus.SyllabusTextElement;

/**
 *
 * @author <a href="mailto:mame-awa.diop@hec.ca">Mame Awa Diop</a>
 * @version $Id: $
 */
public class PlagiarismPolicyProvider implements ExternalDataProvider {

    //TODO: break variables to refer to folder and file if possible I18N
    //TODO: make sure it does not have problems with access permissions
    //TODO: put a securityAdvisor to access to content
    //mysql     public final String CONFIGURATION_File = "/group/8ed156b7-8043-48ce-85ea-6a000347a917/providers/plagiarismPolicy/plagiarismPolicy.properties";
    // Oracle
    public final String CONFIGURATION_File = "/group/tenjin/plagiarismProvider/plagiarismPolicy.properties";
    private ResourceBundle bundle ;
    private String getPolicyContent(){
   	String content = null;
   	
   	try {
   	    ContentResource resource = ContentHostingService.getResource(CONFIGURATION_File);
   	    bundle = new PropertyResourceBundle(resource.streamContent());
   	    content = bundle.getString("plagiarismPolicy");
   	    
   	} catch (PermissionException e) {
   	    e.printStackTrace();
   	} catch (IdUnusedException e) {
   	    e.printStackTrace();
   	} catch (TypeException e) {
   	    e.printStackTrace();
   	} catch (ServerOverloadException e) {
   	    e.printStackTrace();
   	} catch (IOException e) {
   	    e.printStackTrace();
   	}
   	return content;
   	
       }
    @Override
    //TODO: Check if I handle departments
    //TODO: Do I save value at creation with template
    public AbstractSyllabusElement getAbstractSyllabusElement() {
	SyllabusTextElement textElement = new SyllabusTextElement();
	
	textElement.setDescription(getPolicyContent());
	textElement.setTitle(bundle.getString("plagiarismPolicyTitle"));
	
	return textElement;
    }

}

