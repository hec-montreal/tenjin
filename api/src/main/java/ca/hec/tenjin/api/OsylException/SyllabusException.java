/******************************************************************************
 * $Id: $
 ******************************************************************************
 *
 * Copyright (c) 2015 The Sakai Foundation, The Sakai Quebec Team.
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
package ca.hec.opensyllabus2.api.OsylException;


import java.util.HashMap;
import java.util.Map;

import lombok.Data;

import org.springframework.http.HttpStatus;

/**
 *
 * @author <a href="mailto:mame-awa.diop@hec.ca">Mame Awa Diop</a>
 * @version $Id: $
 */
@Data
public class SyllabusException extends Exception{

    private HttpStatus httpStatus;
    private int code;
    private String message;
    
    public SyllabusException(HttpStatus httpStatus){
	this.httpStatus = httpStatus;
	this.code = httpStatus.value();
	this.message = httpStatus.getReasonPhrase();
    }
    
    public SyllabusException(String message) {
		super(message);
	}

	public Map<String, Object> toJSON(){
	Map<String, Object> json = new HashMap<String,Object>();
	json.put("code", httpStatus.value());
	json.put("message", httpStatus.getReasonPhrase());
	return json;
    }
}

