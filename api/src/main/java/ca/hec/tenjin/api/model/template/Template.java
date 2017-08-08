package ca.hec.tenjin.api.model.template;

import java.util.List;

import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author <a href="mailto:mame-awa.diop@hec.ca">Mame Awa Diop</a>
 * @author <a href="mailto:curtis.van-osch@hec.ca">Curtis van Osch</a>
 * @version $Id: $
 */
@Data
@NoArgsConstructor
public class Template {

	private Long id;
	private String title;
	private String description;
	private Boolean active;
	private List<TemplateStructure> elements;
	// private String createdBy;
	// private Date createdDate;

	public TemplateStructure findElementById(Long id) {
		return findElementById(id, elements);
	}

	private TemplateStructure findElementById(Long id, List<TemplateStructure> root) {
		for (TemplateStructure struct : root) {
			if (struct.getId().equals(id)) {
				return struct;
			}

			TemplateStructure child = findElementById(id, struct.getElements());

			if (child != null) {
				return child;
			}
		}

		return null;
	}
}
