package ca.hec.opensyllabus2.api.logic;

import java.util.List;

import ca.hec.opensyllabus2.api.model.Item;

/**
 * An example logic interface
 * 
 * @author Mike Jennings (mike_jennings@unc.edu)
 *
 */
public interface ProjectLogic {

	/**
	 * Get a list of Items
	 * @return
	 */
	public List<Item> getItems();
}
